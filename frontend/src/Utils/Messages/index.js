import { showMessage } from "react-native-flash-message";

export const showSuccess = (text) => {
    showMessage({
        message: text,
        icon: "success",
        style: {
            marginTop: 20,
            marginHorizontal: 20
        },
        type: "success"
    })
}

export const showError = (text) => {
    showMessage({
        message: text,
        icon: "danger",
        style: {
            marginTop: 20,
            marginHorizontal: 20
        },
        type: "danger"
    })
}