// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MouraBateriasDefeituosas {

    // Estrutura dos dados de uma bateria
    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
    }

    // Array dinâmico para armazenar as baterias defeituosas
    Bateria[] public baterias;

    // Função para adicionar uma nova bateria
    function registrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _nr_serie,
        string memory _dataprod,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria({
            tipo: _tipo,
            uso: _uso,
            nr_serie: _nr_serie,
            dataprod: _dataprod,
            lote: _lote
        });
        baterias.push(novaBateria);
    }

    // Getter: retorna uma bateria específica pelo índice
    function getBateria(uint _index) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        require(_index < baterias.length, "Indice invalido");
        Bateria memory b = baterias[_index];
        return (b.tipo, b.uso, b.nr_serie, b.dataprod, b.lote);
    }

    // Retorna o número total de baterias registradas
    function totalBaterias() public view returns (uint) {
        return baterias.length;
    }

    // Função para listar todas as baterias
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }

    // Função para remover uma bateria pelo índice
    function removerBateria(uint _index) public {
        require(_index < baterias.length, "Indice invalido");

        // Substitui o item a ser removido pelo último da lista
        baterias[_index] = baterias[baterias.length - 1];

        // Remove o último elemento
        baterias.pop();
    }
}
