part of pack_app;

InfoScreenState useInfoScreenState() => use(
      LifeHook(
        debugLabel: 'InfoScreenState',
        state: InfoScreenState(),
      ),
    );

class InfoScreenState extends LifeState {
  InfoScreenState();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }
}
