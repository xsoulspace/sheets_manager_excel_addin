part of pack_sheets;

@immutable
@Freezed(
  fromJson: false,
  toJson: false,
  equal: true,
  addImplicitFinal: true,
  copyWith: true,
)
class Diff<T, TOther> with _$Diff<T, TOther> {
  const factory Diff({
    required final T original,
    required final TOther other,
  }) = _Diff<T, TOther>;
  const Diff._();
}
