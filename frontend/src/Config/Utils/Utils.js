export function getFullYear(){
    return new Date().getFullYear();
}


export function getFooterCopy(isIndex) {
    if (isIndex === true) {
        return 'Simplicy';
    } else {
        return 'Simplicy';
    }

}

export const getLatestNotification = () => "<strong className={`text-white`}>Profile Update</strong> - !!important";