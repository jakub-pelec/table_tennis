import React, { FC } from 'react';
import { AppRegistry, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { Controller, Control, FieldValues } from 'react-hook-form';
import Input from '@shared/styled-components/Input/Input';

interface IProps {
    control: Control<FieldValues>,
    inputContainerStyle: StyleProp<ViewStyle>,
    name: string,
    innerProps?: TextInputProps
    errorMessage?: string,
    placeholder?: string,
    defaultValue?: string
}

const FormInput: FC<IProps> = (props) => {
    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={props.inputContainerStyle}>
                    <Input
                        placeholder={props.placeholder}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        error={props.errorMessage}
                        {...props.innerProps}
                    />
                </View>
            )}
            name={props.name}
            rules={{ required: true }}
            defaultValue={props.defaultValue || ''}
        />
    )
};

AppRegistry.registerComponent('formInput', () => FormInput);

export default FormInput;