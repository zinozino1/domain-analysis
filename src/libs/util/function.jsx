export const Function1 = (item) => {
    let num = item.length;

    let initShow = new Array();

    for (var i = 0; i < num; i++){
        initShow[i] = false;
    }

    return initShow;
}