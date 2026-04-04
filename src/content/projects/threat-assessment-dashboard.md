---
title: "Threat Assessment Dashboard"
date: "2025-10-23"
description: "AI-powered threat detection & classification system for aerial objects."
tags: ["projects", "ai", "python", "yolo"]
---

# Threat Assessment Dashboard

AI-powered threat detection & classification system for aerial objects (drones, planes, unknown objects). This system provides real-time threat assessment with comprehensive logging and visualization capabilities.

## Features

- 🎯 **Object Detection**: YOLOv8-powered detection of aerial objects in video streams
- 🚨 **Threat Classification**: Intelligent threat level assessment (High/Medium/Low)
- 📊 **Real-time Dashboard**: Live threat visualization with heatmaps and statistics
- 📝 **Comprehensive Logging**: Events logged every 5 seconds to CSV and SQLite
- 🎬 **Annotated Video Output**: Bounding boxes with threat level indicators
- ⚠️ **Alert System**: Configurable alerts when threat thresholds are exceeded

## System Architecture

### Core Components

1. **ThreatDetector**
   - YOLOv8-based object detection
   - Threat level classification
   - Frame annotation
2. **DataLogger**
   - SQLite and CSV logging
   - Event data management
3. **ThreatDashboard**
   - Real-time visualization with threat heatmaps
4. **AlertSystem**
   - Configurable threat alerts and history tracking

### Threat Classification Logic

The system classifies threats based on:
1. **Object Class**: Predefined threat levels (High: Airplanes/Helicopters, Medium: Drones/Persons, Low: Birds)
2. **Detection Confidence**: High confidence can escalate threat levels
3. **Configurable Rules**: Easy customization of thresholds

## Performance Considerations

- **GPU Acceleration**: Automatically uses CUDA if available
- **Frame Processing**: Optimized for real-time performance
- **Memory Management**: Efficient handling of video streams

*Designed for educational and demonstration purposes.*

[View on GitHub](https://github.com/adithyasrivatsa/Threat-Assessment-Dashboard)
