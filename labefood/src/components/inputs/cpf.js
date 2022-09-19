import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';

export const CpfInput = ({ isValid, value, onChange }) => {
    return (
        <FormControl isInvalid={!isValid}>
            <FormLabel>CPF</FormLabel>
            <Input
                name="cpf"
                value={value}
                onChange={onChange}
                placeholder="CPF"
            />
            {!isValid ? (
                <FormErrorMessage as="p">
                    CPF inválido.
                </FormErrorMessage>
            ) : undefined}
        </FormControl>
    )
}