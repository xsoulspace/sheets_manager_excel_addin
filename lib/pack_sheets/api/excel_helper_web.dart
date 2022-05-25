import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:officejs/officejs.dart';

class ExcelHelper {
  ExcelHelper._();
  static Future<bool> checkIsExcelAvailable() async {
    try {
      if (!kIsWeb) {
        return false;
      } else {
        final officeInfo = await Office.getInfo();

        if (officeInfo == null) {
          return false;
        } else {
          return officeInfo.host == HostType.excel;
        }
      }
      // ignore: avoid_catches_without_on_clauses
    } catch (e) {
      return false;
    }
  }
}
