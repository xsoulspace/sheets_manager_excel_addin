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
mixin _$Diff<T, TOther> {
  T get original => throw _privateConstructorUsedError;
  TOther get other => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $DiffCopyWith<T, TOther, Diff<T, TOther>> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DiffCopyWith<T, TOther, $Res> {
  factory $DiffCopyWith(
          Diff<T, TOther> value, $Res Function(Diff<T, TOther>) then) =
      _$DiffCopyWithImpl<T, TOther, $Res>;
  $Res call({T original, TOther other});
}

/// @nodoc
class _$DiffCopyWithImpl<T, TOther, $Res>
    implements $DiffCopyWith<T, TOther, $Res> {
  _$DiffCopyWithImpl(this._value, this._then);

  final Diff<T, TOther> _value;
  // ignore: unused_field
  final $Res Function(Diff<T, TOther>) _then;

  @override
  $Res call({
    Object? original = freezed,
    Object? other = freezed,
  }) {
    return _then(_value.copyWith(
      original: original == freezed
          ? _value.original
          : original // ignore: cast_nullable_to_non_nullable
              as T,
      other: other == freezed
          ? _value.other
          : other // ignore: cast_nullable_to_non_nullable
              as TOther,
    ));
  }
}

/// @nodoc
abstract class _$$_DiffCopyWith<T, TOther, $Res>
    implements $DiffCopyWith<T, TOther, $Res> {
  factory _$$_DiffCopyWith(
          _$_Diff<T, TOther> value, $Res Function(_$_Diff<T, TOther>) then) =
      __$$_DiffCopyWithImpl<T, TOther, $Res>;
  @override
  $Res call({T original, TOther other});
}

/// @nodoc
class __$$_DiffCopyWithImpl<T, TOther, $Res>
    extends _$DiffCopyWithImpl<T, TOther, $Res>
    implements _$$_DiffCopyWith<T, TOther, $Res> {
  __$$_DiffCopyWithImpl(
      _$_Diff<T, TOther> _value, $Res Function(_$_Diff<T, TOther>) _then)
      : super(_value, (v) => _then(v as _$_Diff<T, TOther>));

  @override
  _$_Diff<T, TOther> get _value => super._value as _$_Diff<T, TOther>;

  @override
  $Res call({
    Object? original = freezed,
    Object? other = freezed,
  }) {
    return _then(_$_Diff<T, TOther>(
      original: original == freezed
          ? _value.original
          : original // ignore: cast_nullable_to_non_nullable
              as T,
      other: other == freezed
          ? _value.other
          : other // ignore: cast_nullable_to_non_nullable
              as TOther,
    ));
  }
}

/// @nodoc

class _$_Diff<T, TOther> extends _Diff<T, TOther> with DiagnosticableTreeMixin {
  const _$_Diff({required this.original, required this.other}) : super._();

  @override
  final T original;
  @override
  final TOther other;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Diff<$T, $TOther>(original: $original, other: $other)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Diff<$T, $TOther>'))
      ..add(DiagnosticsProperty('original', original))
      ..add(DiagnosticsProperty('other', other));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Diff<T, TOther> &&
            const DeepCollectionEquality().equals(other.original, original) &&
            const DeepCollectionEquality().equals(other.other, this.other));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(original),
      const DeepCollectionEquality().hash(other));

  @JsonKey(ignore: true)
  @override
  _$$_DiffCopyWith<T, TOther, _$_Diff<T, TOther>> get copyWith =>
      __$$_DiffCopyWithImpl<T, TOther, _$_Diff<T, TOther>>(this, _$identity);
}

abstract class _Diff<T, TOther> extends Diff<T, TOther> {
  const factory _Diff(
      {required final T original,
      required final TOther other}) = _$_Diff<T, TOther>;
  const _Diff._() : super._();

  @override
  T get original => throw _privateConstructorUsedError;
  @override
  TOther get other => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$$_DiffCopyWith<T, TOther, _$_Diff<T, TOther>> get copyWith =>
      throw _privateConstructorUsedError;
}

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
