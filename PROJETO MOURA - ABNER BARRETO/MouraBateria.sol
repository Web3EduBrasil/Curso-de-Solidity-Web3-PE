// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MouraBateria {
    
    address public owner; 
    
    struct Bateria{
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
    }

    Bateria[] private baterias;

    modifier onlyOwner() {
        require(msg.sender == owner, "Acesso negado: Somente o dono pode executar.");
        _;
    }

    constructor(){
        owner = msg.sender; 
    }

    function cadastrarDefeituosa(string memory _tipo,string memory _uso,string memory _nr_serie,string memory _dataprod,string memory _lote) public onlyOwner {
        Bateria memory bat = Bateria (_tipo, _uso, _nr_serie, _dataprod, _lote);
        baterias.push(bat);
    }

    function listarBaterias() public view returns (Bateria[] memory){
        return baterias;
    }

    function getBaterias() public view returns (uint256){
        return baterias.length;
    }

    function removerBaterias(uint256 index) public onlyOwner {
        require(index < baterias.length, "Indice de bateria invalido");
        baterias[index] = baterias[baterias.length - 1];
        baterias.pop(); 
    }

    function atualizarDefeituosa(
        uint256 index, 
        string memory _tipo,
        string memory _uso,
        string memory _nr_serie,
        string memory _dataprod,
        string memory _lote
    ) public onlyOwner {
        require(index < baterias.length, "Indice Invalido para Atualizacao");

        Bateria storage bat = baterias[index];
        bat.tipo = _tipo;
        bat.uso = _uso;
        bat.nr_serie = _nr_serie;
        bat.dataprod = _dataprod;
        bat.lote = _lote;
    }
}
