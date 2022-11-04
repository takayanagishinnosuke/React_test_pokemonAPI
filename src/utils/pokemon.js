//ポケモンデータをとってくる
export const getAllPokemon =(url) =>{
  //データをとってくるまで待つことをPromis
  return new Promise((resolve,reject)=>{
    fetch(url).then((res) => res.json()).then((data) => resolve(data));
        //fetchしたものをthenでチェーンとして繋いで、resへresをjsonに変換//さらにthenで繋いで,jsonデータにしたものをresolveとする
  });
};

//詳細なポケモンデータをfechする
export const getPokemon = (url) =>{
  return new Promise((resolve, reject) =>{
    fetch(url).then((res)=> res.json()).then((data) => {
      resolve(data)
    });
  });
};