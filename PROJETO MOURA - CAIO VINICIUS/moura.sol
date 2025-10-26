// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Moura{
    struct Bateria{
        string tipo;
        string uso;
        string n_serie;
        string data_prod;
        string lote;
    }

    Bateria[] public baterias;

    constructor(){
    }
    function cadastrarBateria(
        string memory _tipo, 
        string memory _uso,
        string memory _n_serie,
        string memory _data_prod,
        string memory _lote) public {
            baterias.push(Bateria(_tipo, _uso, _n_serie, _data_prod, _lote));
        }
    function listarBateria() public view returns (Bateria[] memory){
        return baterias;
    }
    function getBateria(uint256 index) public view returns (Bateria memory){
        return baterias[index];
    }
    function getBateriaCount() public view returns (uint256){
        return baterias.length;
    }
    function removerBateria(uint256 index) public{
        require(index >= 0 && index < baterias.length, "Indice invalido");
        delete baterias[index];
    }
}