import * as yup from "yup"

export const signUpFormSchema = yup.object({
    name: yup.string().required("Campo obrigatório!"),

    cellphone: yup.string()
        .matches(/^\(\d{0,2}\)\s\d{0,5}-\d{0,4}$/, "Exemplo: (99) 99999-9999")
        .min(15, "Celular deve conter 11 números")
        .required("Campo obrigatório"),

    cpf: yup.string()
        .min(11,"CPF deve conter 11 números")
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve conter 11 números")
        .required("Campo obrigatório"),

    email: yup.string().email("Digite um email válido")
        .required("Campo obrigatório"),

    password: yup.string().min(6, "Senha deve conter ao menos 6 digitos")
        .required("Campo obrigatório"),
        
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
        .required("Campo obrigatório"),

    address: yup.string().required("Campo obrigatório"),

    state: yup.string().required("Campo obrigatório"),

    city: yup.string().required("Campo obrigatório"),

    zip: yup.string()
        .min(9, "CEP deve conter 8 digitos")
        .required("Campo obrigatório"),

    houseNumber: yup.string()
    .required("Campo obrigatório")
    .matches(/^\d{0,4}$/),

    district : yup.string().required("Campo obrigatório"),
})