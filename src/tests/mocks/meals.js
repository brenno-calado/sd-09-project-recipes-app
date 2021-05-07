const mealsData = [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
  },
  {
    idMeal: '52978',
    strMeal: 'Kumpir',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    strTags: 'SideDish',
  },
  {
    idMeal: '53026',
    strMeal: 'Tamiya',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Egyptian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    strTags: null,
  },
  {
    idMeal: '52785',
    strMeal: 'Dal fry',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Indian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    strTags: 'Curry,Vegetarian,Cake',
  },
  {
    idMeal: '52804',
    strMeal: 'Poutine',
    strDrinkAlternate: null,
    strCategory: 'Miscellaneous',
    strArea: 'Canadian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
    strTags: 'UnHealthy,Speciality,HangoverFood',
  },
  {
    idMeal: '52844',
    strMeal: 'Lasagne',
    strDrinkAlternate: null,
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    strTags: null,
  },
  {
    idMeal: '52929',
    strMeal: 'Timbits',
    strDrinkAlternate: null,
    strCategory: 'Dessert',
    strArea: 'Canadian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
    strTags: 'Snack,Treat',
  },
  {
    idMeal: '52948',
    strMeal: 'Wontons',
    strDrinkAlternate: null,
    strCategory: 'Pork',
    strArea: 'Chinese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
    strTags: 'MainMeal',
  },
  {
    idMeal: '52971',
    strMeal: 'Kafteji',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Tunisian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
    strTags: null,
  },
  {
    idMeal: '53013',
    strMeal: 'Big Mac',
    strDrinkAlternate: null,
    strCategory: 'Beef',
    strArea: 'American',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    strTags: null,
  },
  {
    idMeal: '53027',
    strMeal: 'Koshari',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Egyptian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
    strTags: null,
  },
  {
    idMeal: '52769',
    strMeal: 'Kapsalon',
    strDrinkAlternate: null,
    strCategory: 'Lamb',
    strArea: 'Dutch',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg',
    strTags: 'Snack',
  },
  {
    idMeal: '52802',
    strMeal: 'Fish pie',
    strDrinkAlternate: null,
    strCategory: 'Seafood',
    strArea: 'British',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
    strTags: 'Fish,Pie,Breakfast,Baking',
  },
  {
    idMeal: '52854',
    strMeal: 'Pancakes',
    strDrinkAlternate: null,
    strCategory: 'Dessert',
    strArea: 'American',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
    strTags: 'Breakfast,Desert,Sweet,Fruity',
  },
  {
    idMeal: '52887',
    strMeal: 'Kedgeree',
    strDrinkAlternate: null,
    strCategory: 'Seafood',
    strArea: 'British',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg',
    strTags: null,
  },
  {
    idMeal: '52906',
    strMeal: 'Flamiche',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'French',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/wssvvs1511785879.jpg',
    strTags: 'Tart',
  },
  {
    idMeal: '52980',
    strMeal: 'Stamppot',
    strDrinkAlternate: null,
    strCategory: 'Pork',
    strArea: 'Dutch',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/hyarod1565090529.jpg',
    strTags: 'Savory,Breakfast',
  },
  {
    idMeal: '53006',
    strMeal: 'Moussaka',
    strDrinkAlternate: null,
    strCategory: 'Beef',
    strArea: 'Greek',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg',
    strTags: null,
  },
  {
    idMeal: '53028',
    strMeal: 'Shawarma',
    strDrinkAlternate: null,
    strCategory: 'Chicken',
    strArea: 'Egyptian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg',
    strTags: null,
  },
  {
    idMeal: '52791',
    strMeal: 'Eton Mess',
    strDrinkAlternate: null,
    strCategory: 'Dessert',
    strArea: 'British',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg',
    strTags: 'Dairy,Fruity,Desert,Treat,Speciality',
  },
  {
    idMeal: '52811',
    strMeal: 'Ribollita',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/xrrwpx1487347049.jpg',
    strTags: 'Vegetarian',
  },
  {
    idMeal: '52871',
    strMeal: 'Yaki Udon',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Japanese',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg',
    strTags: 'LowCalorie',
  },
  {
    idMeal: '52926',
    strMeal: 'Tourtiere',
    strDrinkAlternate: null,
    strCategory: 'Pork',
    strArea: 'Canadian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/ytpstt1511814614.jpg',
    strTags: 'Pie,MainMeal,BBQ,Cake',
  },
  {
    idMeal: '52931',
    strMeal: 'Sugar Pie',
    strDrinkAlternate: null,
    strCategory: 'Dessert',
    strArea: 'Canadian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg',
    strTags: 'Pie,Desert',
  },
  {
    idMeal: '52963',
    strMeal: 'Shakshuka',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Egyptian',
    strMealThumb:
			'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
    strTags: 'Egg,Brunch,Breakfast',
  },
];

export default mealsData;
