import React, { useState, useEffect } from "react";
import { Table, Image, Tag, Carousel, AutoComplete } from "antd";
import axios from "axios";
import colorTypes from "./typeColor";

const mapPokemon = (arr) => {
  return arr.map((pokemon) => {
    return {
      value: pokemon.name,
      pokemonObj: pokemon,
    };
  });
};

const PokeTable = ({ rawPokemons }) => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const fetchEachPoke = async () => {
    let arrPokeDetails = [];
    for (let i = 0; i < rawPokemons.length; i++) {
      let response = await axios.get(rawPokemons[i].url);
      arrPokeDetails.push({ ...response.data, key: response.data.id });
    }
    console.log(arrPokeDetails);
    setDataSource(arrPokeDetails);
    setFilteredDataSource(arrPokeDetails);
  };
  useEffect(() => {
    if (rawPokemons.length !== 0) fetchEachPoke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawPokemons]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Peso",
      dataIndex: "weight",
    },
    {
      title: "Altura",
      dataIndex: "height",
    },
    {
      title: "Imagen",
      dataIndex: "sprites",
      render: ({ front_default }) => <Image src={front_default} />,
    },
    {
      title: "Tipo de pokemon",
      dataIndex: "types",
      render: (typesArray) =>
        typesArray.map((tipo) => (
          <Tag key={tipo.slot} color={colorTypes[tipo.type.name]}>
            {tipo.type.name}
          </Tag>
        )),
    },
  ];
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      {dataSource.length >= 10 && (
        <Carousel autoplay={true} effect="fade" dotPosition="bottom">
          {dataSource.slice(0, 10).map((poke) => (
            <div key={poke.key}>
              <Image src={poke.sprites.front_default} />
              <h1 style={contentStyle}>{poke.name}</h1>
            </div>
          ))}
        </Carousel>
      )}

      <AutoComplete
        style={{
          width: 400,
        }}
        options={mapPokemon(dataSource)}
        placeholder="Pokemon 😼"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(value, { pokemonObj }) => {
          if (value === "") {
            setFilteredDataSource(dataSource);
          } else {
            setFilteredDataSource(
              dataSource.filter((pokepoke) => {
                return pokepoke.name.toUpperCase().indexOf(value.toUpperCase())!==-1;
              })
            );
          }
        }}
      />
      <Table
        dataSource={filteredDataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 25,
          position: ["bottomCenter"],
          pageSizeOptions: [5, 10, 25, 50],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
};

export default PokeTable;
