//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BateriasPremiumDefeituosas {
    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
    }

    Bateria[] private baterias;

    function adicionarBateria(string memory tipo, string memory uso, string memory nr_serie, string memory dataprod, string memory lote) public {
        Bateria memory bat= Bateria(tipo, uso, nr_serie, dataprod, lote);
        baterias.push(bat);
    }

    function getBateria(uint index) public view returns (Bateria memory) {
        return baterias[index];
    }
    function getNumeroBaterias() public view returns (uint) {
        return baterias.length;
    }
    function getBaterias() public view returns (Bateria[] memory) {
        return baterias;
    }
    function alterarBateria(uint pos, string memory tipo, string memory uso, string memory nr_serie, string memory dataprod, string memory lote) public {
        baterias[pos].tipo = tipo;
        baterias[pos].uso = uso;
        baterias[pos].nr_serie = nr_serie;
        baterias[pos].dataprod = dataprod;
        baterias[pos].lote = lote;
    }
}