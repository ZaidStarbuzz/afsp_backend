export const generateReferralCodeUtil = async (models): Promise<string> => {
  const letters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
  const numbers = '123456789';

  const getRandomChar = (charset: string): string => {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  };

  let referralCode: string;
  let exists = true;

  while (exists) {
    referralCode =
      getRandomChar(letters) +
      getRandomChar(letters) +
      getRandomChar(letters) +
      getRandomChar(numbers) +
      getRandomChar(numbers) +
      getRandomChar(letters) +
      getRandomChar(numbers);

    exists = await models.prjModels.Users.findOne({
      where: { referral_code: referralCode },
    });
    return referralCode;
  }

  return '--';
};
