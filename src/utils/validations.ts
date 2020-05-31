export const validateRoomName = (value?: string) => {
  if (!value) return 'Room name is required';
  if (value.length < 3 || value.length > 9)
    return 'Invalid room name length';
};
export const validateRoomPasword = (value?: string) => {
  if (!value) return 'Room password is required';

  if (value.length < 3 || value.length > 14)
    return 'Invalid room name length';
};
export const validateRoomPlayersLength = (
  value: string | number,
  { min, max }: { min: number; max: number },
) => {
  if (!value) return 'Players length is required';
  if (typeof value !== 'number')
    return 'players number must be a number type';
  if (value < min || value > max) return 'players length is invalid';
};
