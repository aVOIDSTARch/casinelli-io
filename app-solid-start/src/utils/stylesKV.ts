/**
 * Creates an object with class names as keys and a boolean value for all.
 * Useful for conditionally applying multiple CSS classes.
 *
 * @param classNames - Array of class name strings
 * @param value - Boolean value to assign to all class names
 * @returns Object with class names as keys and the boolean as values
 *
 * @example
 * stylesKV(['active', 'visible', 'highlighted'], true)
 * // Returns: { active: true, visible: true, highlighted: true }
 *
 * @example
 * stylesKV(['disabled', 'hidden'], false)
 * // Returns: { disabled: false, hidden: false }
 */

export type StylesKV = { [k: string]: boolean };

export default function createStylesKV(
    classNames: string[],
    value: boolean
): Record<string, boolean> {
    return classNames.reduce(
        (acc, className) => {
            acc[className] = value;
            return acc;
        },
        {} as StylesKV
    );
}
