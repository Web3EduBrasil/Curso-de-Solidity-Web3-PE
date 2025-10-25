// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeituosas {
    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
        string desc_defeito;
    }

    Bateria[] private baterias;

    // Adiciona uma nova bateria
    function adicionarBateria(
        string memory tipo,
        string memory uso,
        string memory nr_serie,
        string memory dataprod,
        string memory lote,
        string memory desc_defeito
    ) public {
        baterias.push(Bateria(tipo, uso, nr_serie, dataprod, lote, desc_defeito));
    }

    // Retorna todas as baterias
    function getBaterias() public view returns (Bateria[] memory) {
        return baterias;
    }

    // Retorna uma bateria específica
    function getBateria(uint256 index) public view returns (Bateria memory) {
        require(index < baterias.length, "Indice invalido");
        return baterias[index];
    }

    // Edita os dados de uma bateria existente
    function editarBateria(
        uint256 index,
        string memory tipo,
        string memory uso,
        string memory nr_serie,
        string memory dataprod,
        string memory lote,
        string memory desc_defeito
    ) public {
        require(index < baterias.length, "Indice invalido");
        baterias[index] = Bateria(tipo, uso, nr_serie, dataprod, lote, desc_defeito);
    }

    // Exclui uma bateria substituindo pelo último elemento
    function deleteBateria(uint256 index) public {
        require(index < baterias.length, "Indice invalido");
        baterias[index] = baterias[baterias.length - 1];
        baterias.pop();
    }
}