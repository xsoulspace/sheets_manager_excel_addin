// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'pack_sheets.dart';

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
  bool get syncWithExcel => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $DiffCopyWith<T, TOther, Diff<T, TOther>> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DiffCopyWith<T, TOther, $Res> {
  factory $DiffCopyWith(
          Diff<T, TOther> value, $Res Function(Diff<T, TOther>) then) =
      _$DiffCopyWithImpl<T, TOther, $Res, Diff<T, TOther>>;
  @useResult
  $Res call({T original, TOther other, bool syncWithExcel});
}

/// @nodoc
class _$DiffCopyWithImpl<T, TOther, $Res, $Val extends Diff<T, TOther>>
    implements $DiffCopyWith<T, TOther, $Res> {
  _$DiffCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? original = freezed,
    Object? other = freezed,
    Object? syncWithExcel = null,
  }) {
    return _then(_value.copyWith(
      original: freezed == original
          ? _value.original
          : original // ignore: cast_nullable_to_non_nullable
              as T,
      other: freezed == other
          ? _value.other
          : other // ignore: cast_nullable_to_non_nullable
              as TOther,
      syncWithExcel: null == syncWithExcel
          ? _value.syncWithExcel
          : syncWithExcel // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_DiffCopyWith<T, TOther, $Res>
    implements $DiffCopyWith<T, TOther, $Res> {
  factory _$$_DiffCopyWith(
          _$_Diff<T, TOther> value, $Res Function(_$_Diff<T, TOther>) then) =
      __$$_DiffCopyWithImpl<T, TOther, $Res>;
  @override
  @useResult
  $Res call({T original, TOther other, bool syncWithExcel});
}

/// @nodoc
class __$$_DiffCopyWithImpl<T, TOther, $Res>
    extends _$DiffCopyWithImpl<T, TOther, $Res, _$_Diff<T, TOther>>
    implements _$$_DiffCopyWith<T, TOther, $Res> {
  __$$_DiffCopyWithImpl(
      _$_Diff<T, TOther> _value, $Res Function(_$_Diff<T, TOther>) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? original = freezed,
    Object? other = freezed,
    Object? syncWithExcel = null,
  }) {
    return _then(_$_Diff<T, TOther>(
      original: freezed == original
          ? _value.original
          : original // ignore: cast_nullable_to_non_nullable
              as T,
      other: freezed == other
          ? _value.other
          : other // ignore: cast_nullable_to_non_nullable
              as TOther,
      syncWithExcel: null == syncWithExcel
          ? _value.syncWithExcel
          : syncWithExcel // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _$_Diff<T, TOther> extends _Diff<T, TOther> {
  const _$_Diff(
      {required this.original,
      required this.other,
      required this.syncWithExcel})
      : super._();

  @override
  final T original;
  @override
  final TOther other;
  @override
  final bool syncWithExcel;

  @override
  String toString() {
    return 'Diff<$T, $TOther>(original: $original, other: $other, syncWithExcel: $syncWithExcel)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Diff<T, TOther> &&
            const DeepCollectionEquality().equals(other.original, original) &&
            const DeepCollectionEquality().equals(other.other, this.other) &&
            (identical(other.syncWithExcel, syncWithExcel) ||
                other.syncWithExcel == syncWithExcel));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(original),
      const DeepCollectionEquality().hash(other),
      syncWithExcel);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_DiffCopyWith<T, TOther, _$_Diff<T, TOther>> get copyWith =>
      __$$_DiffCopyWithImpl<T, TOther, _$_Diff<T, TOther>>(this, _$identity);
}

abstract class _Diff<T, TOther> extends Diff<T, TOther> {
  const factory _Diff(
      {required final T original,
      required final TOther other,
      required final bool syncWithExcel}) = _$_Diff<T, TOther>;
  const _Diff._() : super._();

  @override
  T get original;
  @override
  TOther get other;
  @override
  bool get syncWithExcel;
  @override
  @JsonKey(ignore: true)
  _$$_DiffCopyWith<T, TOther, _$_Diff<T, TOther>> get copyWith =>
      throw _privateConstructorUsedError;
}
