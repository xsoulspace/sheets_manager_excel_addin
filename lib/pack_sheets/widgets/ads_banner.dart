import 'package:fluent_ui/fluent_ui.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:life_hooks/life_hooks.dart';
import 'package:webviewx/webviewx.dart';

AdsBannerState useAdsBannerState() => use(
      LifeHook(
        debugLabel: 'AdsBannerState',
        state: AdsBannerState(),
      ),
    );

class AdsBannerState extends LifeState {
  AdsBannerState();
  WebViewXController? webviewController;
  @override
  void dispose() {
    webviewController?.dispose();
    super.dispose();
  }

  // ignore: use_setters_to_change_properties
  void setController(final WebViewXController controller) {
    webviewController = controller;
  }

  String _message = '';

  String get message => _message;

  set message(final String message) {
    _message = message;
    setState();
  }
}

class AdsBanner extends HookWidget {
  const AdsBanner({super.key});

  @override
  Widget build(final BuildContext context) {
    final state = useAdsBannerState();
    final screenSize = MediaQuery.of(context).size;

    if (kIsWeb) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(state.message),
          WebViewX(
            height: 80,
            jsContent: const {
              EmbeddedJsContent(
                js: '''
                  function initAd(){
                    window.yaContextCb=window.yaContextCb||[]
                    const scriptTag = document.createElement("script");
                    scriptTag.src = "https://yandex.ru/ads/system/context.js";
                    scriptTag.id = "yandex";
                    scriptTag.addEventListener("load", () => {
                      window.yaContextCb.push(()=>{
                        Ya.Context.AdvManager.render({
                          renderTo: 'yandex_rtb_R-A-2140277-2',
                          blockId: 'R-A-2140277-2'
                        })
                      })
                    });
                    document.getElementsByTagName("head")[0].appendChild(scriptTag);
                  }
                ''',
              )
            },
            onPageFinished: (final src) {
              state.webviewController?.callJsMethod('initAd', []);
            },
            width: screenSize.width,
            initialContent: '<div id="yandex_rtb_R-A-2140277-2"></div>',
            initialSourceType: SourceType.html,
            onWebViewCreated: state.setController,
          ),
        ],
      );
    }
    return Container(
      height: 80,
      width: screenSize.width,
      color: Colors.green,
    );
  }
}
