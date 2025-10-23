// SPXD-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bateria{
    struct Cadastro{
        string tipo;
        string uso;
        string num_serie;
        string data_prod;
        string lote;
    }

    Cadastro[] public baterias;


    constructor() {
    }


    //getters e setters
    function getTipoBateria(uint _index) public view returns (string memory) {
        return baterias[_index].tipo;
    }

     function getUsoBateria(uint _index) public view returns (string memory) {
        return baterias[_index].uso;
    }   

    function getNumSerieBateria(uint _index) public view returns (string memory) {
        return baterias[_index].num_serie;
    }

    function getDataProdBateria(uint _index) public view returns (string memory) {
        return baterias[_index].data_prod;
    }   

    function getLoteBateria(uint _index) public view returns (string memory) {
        return baterias[_index].lote;
    }

    function setTipoBateria(uint _index, string memory _tipo) public {
        baterias[_index].tipo = _tipo;
    }

    function setUsoBateria(uint _index, string memory _uso) public {
        baterias[_index].tipo = _uso;
    }

     function setNumSerieBateria(uint _index, string memory _num_serie) public {
        baterias[_index].tipo = _num_serie;
    }

    function setDataProdBateria(uint _index, string memory _data_prod) public {
        baterias[_index].tipo = _data_prod;
    }

    function setLoteBateria(uint _index, string memory _lote) public {
        baterias[_index].tipo = _lote;
    }



    //funções originais
    function cadastrarBateria(string memory _tipo, string memory _uso, string memory _num_serie, string memory _data_prod, string memory _lote) public {
        baterias.push(Cadastro(_tipo, _uso, _num_serie, _data_prod, _lote));
    }

    function listarBaterias() view public returns (Cadastro[] memory) {
        return baterias;
    }


}