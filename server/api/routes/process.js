const express = require('express');
const router = express.Router();
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// Настройка загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// AI сервисы
const AIService = require('../../services/ai/ArtCuratorAI');

// Процессор AI обработки
router.post('/process', upload.fields([
  { name: 'room', maxCount: 1 },
  { name: 'art', maxCount: 1 }
]), async (req, res) => {
  try {
    const { room, art } = req.files;
    const settings = JSON.parse(req.body.settings || '{}');
    
    if (!room || !art) {
      return res.status(400).json({
        error: 'Требуются оба изображения: комната и искусство'
      });
    }
    
    // Валидация изображений
    const roomImage = await sharp(room[0].buffer).metadata();
    const artImage = await sharp(art[0].buffer).metadata();
    
    if (roomImage.width < 512 || roomImage.height < 512) {
      return res.status(400).json({
        error: 'Изображение комнаты должно быть минимум 512x512 пикселей'
      });
    }
    
    // Создание ID обработки
    const processId = uuidv4();
    
    // Запуск AI обработки (асинхронно)
    const aiService = new AIService();
    const result = await aiService.processImages(
      room[0].buffer,
      art[0].buffer,
      settings
    );
    
    // Сохранение в базу данных
    const dbResult = await saveToDatabase({
      processId,
      roomSize: { width: roomImage.width, height: roomImage.height },
      artSize: { width: artImage.width, height: artImage.height },
      settings,
      confidence: result.confidence,
      processingTime: result.processingTime,
      userId: req.user?.id || 'anonymous'
    });
    
    // Возврат результата
    res.json({
      success: true,
      processId,
      resultUrl: result.imageUrl,
      confidence: result.confidence,
      processingTime: result.processingTime,
      details: result.details,
      shareUrl: `https://artcurator.ai/share/${processId}`,
      downloadUrl: `https://artcurator.ai/download/${processId}`
    });
    
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({
      error: 'Ошибка при обработке изображений',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// API для галерей
router.post('/gallery/process-batch', async (req, res) => {
  try {
    const { galleryId, artworks, settings } = req.body;
    
    if (!galleryId || !artworks || !Array.isArray(artworks)) {
      return res.status(400).json({ error: 'Неверные параметры запроса' });
    }
    
    // Проверка лимитов галереи
    const gallery = await checkGalleryLimits(galleryId);
    if (!gallery.canProcess) {
      return res.status(402).json({
        error: 'Лимит обработок исчерпан',
        upgradeUrl: 'https://artcurator.ai/upgrade'
      });
    }
    
    // Пакетная обработка
    const results = [];
    const aiService = new AIService();
    
    for (const artwork of artworks) {
      const result = await aiService.processGalleryArtwork(
        gallery.roomTemplate,
        artwork,
        settings
      );
      
      results.push({
        artworkId: artwork.id,
        resultUrl: result.imageUrl,
        confidence: result.confidence,
        thumbnail: await generateThumbnail(result.imageUrl)
      });
      
      // Обновление счетчика обработок
      await incrementProcessCount(galleryId);
    }
    
    res.json({
      success: true,
      count: results.length,
      results,
      estimatedTime: results.length * 2.5, // секунд
      totalCreditsUsed: results.length
    });
    
  } catch (error) {
    console.error('Batch processing error:', error);
    res.status(500).json({ error: 'Ошибка пакетной обработки' });
  }
});

// API для анализа интерьера
router.post('/analyze/room', upload.single('room'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const aiService = new AIService();
    
    const analysis = await aiService.analyzeRoom(imageBuffer, {
      detectWalls: true,
      detectLighting: true,
      detectFurniture: true,
      calculatePerspective: true
    });
    
    res.json({
      success: true,
      analysis: {
        walls: analysis.walls,
        lighting: analysis.lighting,
        perspective: analysis.perspective,
        recommendedPositions: analysis.recommendedPositions,
        roomType: analysis.roomType,
        colorScheme: analysis.colorScheme
      }
    });
    
  } catch (error) {
    console.error('Room analysis error:', error);
    res.status(500).json({ error: 'Ошибка анализа комнаты' });
  }
});

// API для сегментации искусства
router.post('/segment/art', upload.single('art'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const aiService = new AIService();
    
    const segmentation = await aiService.segmentArtwork(imageBuffer, {
      removeBackground: true,
      detectEdges: true,
      extractColors: true
    });
    
    res.json({
      success: true,
      segmentation: {
        mask: segmentation.mask,
        boundingBox: segmentation.boundingBox,
        dominantColors: segmentation.colors,
        artworkType: segmentation.type,
        hasFrame: segmentation.hasFrame
      }
    });
    
  } catch (error) {
    console.error('Art segmentation error:', error);
    res.status(500).json({ error: 'Ошибка сегментации произведения' });
  }
});

// История обработок пользователя
router.get('/history', async (req, res) => {
  try {
    const userId = req.user?.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const history = await getUserProcessingHistory(userId, page, limit);
    
    res.json({
      success: true,
      page,
      limit,
      total: history.total,
      items: history.items.map(item => ({
        id: item.processId,
        createdAt: item.createdAt,
        roomPreview: item.roomThumbnail,
        artPreview: item.artThumbnail,
        resultPreview: item.resultThumbnail,
        confidence: item.confidence,
        settings: item.settings,
        shareUrl: item.shareUrl
      }))
    });
    
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Ошибка получения истории' });
  }
});

// Экспорт результатов
router.post('/export', async (req, res) => {
  try {
    const { processIds, format, quality } = req.body;
    
    if (!processIds || !Array.isArray(processIds)) {
      return res.status(400).json({ error: 'Неверные параметры экспорта' });
    }
    
    const exportService = new ExportService();
    const exportResult = await exportService.exportProcesses(
      processIds,
      format || 'zip',
      quality || 'high'
    );
    
    res.json({
      success: true,
      downloadUrl: exportResult.downloadUrl,
      expiresAt: exportResult.expiresAt,
      fileSize: exportResult.fileSize,
      formats: exportResult.formats
    });
    
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Ошибка экспорта' });
  }
});

// Вспомогательные функции
async function saveToDatabase(data) {
  // Реализация сохранения в базу данных
  // Используйте PostgreSQL, MongoDB или другую БД
  return { id: data.processId, saved: true };
}

async function checkGalleryLimits(galleryId) {
  // Проверка лимитов обработок для галереи
  return { canProcess: true, remaining: 100 };
}

async function incrementProcessCount(galleryId) {
  // Увеличение счетчика обработок
}

async function getUserProcessingHistory(userId, page, limit) {
  // Получение истории обработок
  return { total: 0, items: [] };
}

class ExportService {
  async exportProcesses(processIds, format, quality) {
    // Логика экспорта
    return {
      downloadUrl: 'https://artcurator.ai/download/export.zip',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      fileSize: '45MB',
      formats: ['jpg', 'png', 'pdf']
    };
  }
}

module.exports = router;