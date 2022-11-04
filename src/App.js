import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import Navber from './components/Navbar/Navber';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData,setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")

  useEffect(() => {
    const fetchpokemonData = async () =>{
      //すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next)
      setPrevURL(res.previous) //最初はnullになる
      setLoading(false)
    };
    fetchpokemonData()
  },[]);

  //一つ一つのポケモンを呼び出す関数
  const loadPokemon = async(data) =>{
    //一つ一つのURLに対してfechをしないといけないので時間がかかる
    //allの引数は配列をいれる
    //すべてのfechが終わるまで待つよという意味でのPromise.all
    let _pokemonData = await Promise.all(
      data.map((pokemon) =>{
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord
      })
    );
    //useStateのpokemonDataにセットする
    setPokemonData(_pokemonData);
  };


  const handleNextPage = async()=>{
    //setLoadingをtrueにしておく
    setLoading(true);
    //新しいページのポケモンデータを取得する
    let data = await getAllPokemon(nextURL);
    //ポケモンデータを1個1個取り出して表示させる関数へ渡す
    await loadPokemon(data.results)
    //stateにnextのURLをセット
    setNextURL(data.next)
    //stateにprevのURLをセット
    setPrevURL(data.previous)
    //setLoadingをfalseにしておく
    setLoading(false)
  };

  const handlePrevPage = async()=>{
    //prevURLがnullだったらreturnする
    if(!prevURL) return;

    setLoading(true)
    let data = await getAllPokemon(prevURL) 
    //ポケモンデータを1個1個取り出して表示させる関数へ渡す
    await loadPokemon(data.results)
    //stateにnextのURLをセット
    setNextURL(data.next)
    //stateにprevのURLをセット
    setPrevURL(data.previous)
    //setLoadingをfalseにしておく
    setLoading(false)
  };

  return (
    <>
    <Navber />
    <div className="App">
      {loading ? (
        <h1>ロード中</h1>
      ) : (
      <>
        <div className='pokemonCardConeainer'>
          {pokemonData.map((pokemon,i)=>{
            return <Card key={i} pokemon={pokemon}/>
          })}
        </div>
        <div className='btn'>
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </>
      )}
    </div>
    </>
  );
}

export default App;
