import 'package:sheet_manager/pack_core/pack_core.dart';

export 'firebase_io.dart' if (dart.library.html) 'firebase_web.dart';

abstract class AbstractFirebaseInitializer implements ContextlessLoadable {
  @override
  Future<void> onLoad();
  Future<void> onDelayedLoad();
}
