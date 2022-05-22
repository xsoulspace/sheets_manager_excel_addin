// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of pack_sheets;

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$SheetModel {
  String get name => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $SheetModelCopyWith<SheetModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SheetModelCopyWith<$Res> {
  factory $SheetModelCopyWith(
          SheetModel value, $Res Function(SheetModel) then) =
      _$SheetModelCopyWithImpl<$Res>;
  $Res call({String name});
}

/// @nodoc
class _$SheetModelCopyWithImpl<$Res> implements $SheetModelCopyWith<$Res> {
  _$SheetModelCopyWithImpl(this._value, this._then);

  final SheetModel _value;
  // ignore: unused_field
  final $Res Function(SheetModel) _then;

  @override
  $Res call({
    Object? name = freezed,
  }) {
    return _then(_value.copyWith(
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
abstract class _$$_SheetModelCopyWith<$Res>
    implements $SheetModelCopyWith<$Res> {
  factory _$$_SheetModelCopyWith(
          _$_SheetModel value, $Res Function(_$_SheetModel) then) =
      __$$_SheetModelCopyWithImpl<$Res>;
  @override
  $Res call({String name});
}

/// @nodoc
class __$$_SheetModelCopyWithImpl<$Res> extends _$SheetModelCopyWithImpl<$Res>
    implements _$$_SheetModelCopyWith<$Res> {
  __$$_SheetModelCopyWithImpl(
      _$_SheetModel _value, $Res Function(_$_SheetModel) _then)
      : super(_value, (v) => _then(v as _$_SheetModel));

  @override
  _$_SheetModel get _value => super._value as _$_SheetModel;

  @override
  $Res call({
    Object? name = freezed,
  }) {
    return _then(_$_SheetModel(
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_SheetModel extends _SheetModel with DiagnosticableTreeMixin {
  const _$_SheetModel({required this.name}) : super._();

  @override
  final String name;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'SheetModel(name: $name)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'SheetModel'))
      ..add(DiagnosticsProperty('name', name));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_SheetModel &&
            const DeepCollectionEquality().equals(other.name, name));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(name));

  @JsonKey(ignore: true)
  @override
  _$$_SheetModelCopyWith<_$_SheetModel> get copyWith =>
      __$$_SheetModelCopyWithImpl<_$_SheetModel>(this, _$identity);
}

abstract class _SheetModel extends SheetModel {
  const factory _SheetModel({required final String name}) = _$_SheetModel;
  const _SheetModel._() : super._();

  @override
  String get name => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$$_SheetModelCopyWith<_$_SheetModel> get copyWith =>
      throw _privateConstructorUsedError;
}
