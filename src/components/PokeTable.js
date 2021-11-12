import React, { useState, useEffect } from "react";
import { Table, Image, Tag } from "antd";
import axios from "axios";
import colorTypes from './typeColor'

const PokeTable = ({ rawPokemons }) => {
  const [dataSource, setDataSource] = useState([]);

  const fetchEachPoke = async() => {
    let arrPokeDetails = [];
    for(let i=0;i<rawPokemons.length;i++){
      let response = await axios.get(rawPokemons[i].url);
      arrPokeDetails.push({...response.data, "key":response.data.id})
    }
    console.log(arrPokeDetails)
    setDataSource(arrPokeDetails)
  };
  useEffect(() => {
    if(rawPokemons.length!==0) fetchEachPoke();
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
      title:"Imagen",
      dataIndex:"sprites",
      render: ({front_default})=>(
        <Image src={front_default} />
      )
    },{
      title:"Tipo de pokemon",
      dataIndex:"types",
      render :(typesArray)=>(
        typesArray.map(tipo=><Tag key={tipo.slot} color={colorTypes[tipo.type.name]}>{tipo.type.name}</Tag>)
      )
    }
    /*    {
            title: 'Available?',
            dataIndex:'available',
            render: (available, record, index)=>(
                <>
                    {available?(
                        <Tag color="green">DISPONIBLE</Tag>
                    ):(
                        <Tag color="red">NO DISPONIBLE</Tag>
                    )}
                </>
            ),
            
        }*/
  ];
  return <Table dataSource={dataSource} columns={columns} pagination={{defaultPageSize:25 ,position:['bottomCenter'],  pageSizeOptions:[5,10,25,50], showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}} />;
};

export default PokeTable;
