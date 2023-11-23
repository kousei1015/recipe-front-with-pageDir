export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = SignIn & {
  name: string;
  password_confirmation: string;
};

export type AUTHINFO = {
  is_login: boolean;
  user_id?: number;
  user_name?: string;
  avatar_url?: string;
};

export type ModalProps = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  user_name: string;
  avatar_url: string;
};

export type ProfileEditProps = {
  name: string;
  avatar: File;
}

export type RECIPEBASE = {
  id: number;
  name: string;
  image_url: string;
  user_id: number;
  user_name: string;
};

export type RECIPE = {
  id: number;
  recipe_name: string;
  process: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  image_url: string;
  user_id: number;
  user_name: string;
  avatar_url: string;
  favorite_id?: number;
  follow_id?: number;
};

export type RECIPES = {
  recipes: {
    id: number;
    recipe_name: string;
    image_url: string;
    user_id: number;
    user_name: string;
  }[];
};

export type FavRecipes = {
  favorite_id: number;
  recipe_id: number;
  recipe_name: string;
  user_id: number;
  user_name: string;
  image_url: string;
}[];

export type FOLLOW = {
  id: number;
  follower_id: number;
  followed_id: number;
  user_name: string;
  avatar_url: string;
}[];
