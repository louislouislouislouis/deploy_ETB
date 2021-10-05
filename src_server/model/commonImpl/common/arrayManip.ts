
/**
 *
 * @param arr the array
 * @returns elimine the doublons
 */
export function deleteDoubleValue<t>(arr : t[]) : t[] {
    return arr.filter( (ele,pos)=>arr.indexOf(ele) === pos);
}