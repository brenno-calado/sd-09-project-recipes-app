const AREA_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export default {
  async getAreas() {
    try {
      const areasHTTP = await fetch(AREA_URL);
      if (areasHTTP.ok) {
        const areasJSON = await areasHTTP.json();
        return areasJSON.meals;
      }
      throw new Error('Falha ao buscar regiões das receitas =(');
    } catch (e) {
      return { message: e.message };
    }
  },
};
