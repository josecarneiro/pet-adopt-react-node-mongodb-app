export const speciesOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' }
];

export const sizesOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
];

export const qualitiesOptions = [
  { value: 'calm', label: 'Calm' },
  { value: 'good_with_kids', label: 'Good with kids' },
  { value: 'hypoallergenic', label: 'Hypoallergenic' }
];

export const getHumanReadableGender = gender => {
  const genderMap = { male: 'Male', female: 'Female' };
  const humanReadableFormat = genderMap[gender];
  return humanReadableFormat;
};
