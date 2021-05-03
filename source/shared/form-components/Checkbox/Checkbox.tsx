import React, { FC } from 'react';
import { AppRegistry, StyleProp, View, ViewStyle } from 'react-native';
import { Controller, Control, FieldValues } from 'react-hook-form';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';

interface IProps {
    control: Control<FieldValues>,
    checkboxContainerStyle: StyleProp<ViewStyle>,
    name: string,
    innerProps?: CheckBoxProps
    errorMessage?: string,
    placeholder?: string,
    defaultValue?: string
}

const FormCheckbox: FC<IProps> = (props) => {
    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <View style={props.checkboxContainerStyle}>
                    <CheckBox onValueChange={onChange} value={value} {...props.innerProps} />
                </View>
            )}
            name={props.name}
            rules={{ required: true }}
            defaultValue={props.defaultValue || false}
        />
    )
};

AppRegistry.registerComponent('formCheckbox', () => FormCheckbox);

export default FormCheckbox;