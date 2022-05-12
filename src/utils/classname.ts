type Falsy = false | 0 | '' | null | undefined;
type ClassnameValue = string | Falsy;
type ClassnameObject = { [key: string]: boolean | Falsy };
/**
 * @description Classname utility
 * - create classname from template literal
 * - if inserted classname is falsy, ignore it
 * - insert whitespace between classnames automatically
 */
export function cls(
  strings: TemplateStringsArray,
  ...values: Array<ClassnameValue | ClassnameObject>
): string {
  return strings.reduce((prev, curr, i) => {
    // Add whitespace after prev
    prev = prev.trim() + ' ';
    curr = curr.trim();
    if (i === values.length) return prev + curr;

    // Add whitespace after curr
    let result = prev + curr + ' ';

    const value = values[i];
    if (value === false || value === undefined || value === null || value === '') {
    } else if (typeof value === 'string') {
      result += value;
    } else if (typeof value === 'object') {
      result += Object.entries(value).reduce((prev, [key, val]) => (val ? prev + key : prev), '');
    } else {
      process.env.NODE_ENV === 'development' &&
        console.warn('unknown classname value', value, 'ignored');
    }

    return result;
  }, '');
}
