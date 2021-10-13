import VowelValues from "./VowelValues";

export default class Sum {

  public static sumNumbersInString(str: string): number {
    const numbers = str.match(/\d/g);
    
    if(!numbers) return 0;
    return numbers.reduce((sum, number) => sum + parseInt(number), 0);
  }


  public static sumVowelsInString(str: string): number {
    const vowels = str.match(/[aeiou]/g);
    const vowelValues = vowels?.map((vowel) => VowelValues[vowel]);
  
    if(!vowelValues) return 0;
    return vowelValues.reduce((sum, number) => sum + number, 0);
  }
}
