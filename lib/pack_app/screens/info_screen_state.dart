part of pack_app;

InfoScreenState useInfoScreenState() => use(
      LifeHook(
        debugLabel: 'InfoScreenState',
        state: InfoScreenState(),
      ),
    );

class InfoScreenState extends LifeState {
  InfoScreenState();
}
