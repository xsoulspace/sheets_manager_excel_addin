part of pack_sheets;

@immutable
@Freezed(
  fromJson: false,
  toJson: false,
  equal: true,
  addImplicitFinal: true,
  copyWith: true,
)
class SheetModel with _$SheetModel {
  const factory SheetModel({
    required final String name,
    required final String id,
  }) = _SheetModel;
  const SheetModel._();
}
