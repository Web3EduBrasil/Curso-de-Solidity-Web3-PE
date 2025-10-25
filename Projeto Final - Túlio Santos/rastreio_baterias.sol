// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeituosas {
    
    // Estrutura para armazenar os dados da bateria
    struct Bateria {
        string tipo;
        string uso; // automotivo, náutico, industrial
        string numeroSerie;
        string dataProducao;
        string lote;
    }

    // Array dinâmico para armazenar baterias defeituosas
    Bateria[] public baterias;

    // Evento para registrar quando uma bateria é adicionada
    event BateriaRegistrada(uint index, string numeroSerie);

    // Função para adicionar uma nova bateria defeituosa
    function registrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _numeroSerie,
        string memory _dataProducao,
        string memory _lote
    ) public {
        baterias.push(Bateria(_tipo, _uso, _numeroSerie, _dataProducao, _lote));
        emit BateriaRegistrada(baterias.length - 1, _numeroSerie);
    }

    // Função para recuperar os dados de uma bateria específica
    function getBateria(uint index) public view returns (
        string memory tipo,
        string memory uso,
        string memory numeroSerie,
        string memory dataProducao,
        string memory lote
    ) {
        require(index < baterias.length, unicode"Índice inválido");
        Bateria memory b = baterias[index];
        return (b.tipo, b.uso, b.numeroSerie, b.dataProducao, b.lote);
    }

    // Função para listar todas as baterias defeituosas
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }

    // Função para remover uma bateria defeituosa pelo índice
    function removerBateria(uint index) public {
        require(index < baterias.length, unicode"Índice inválido");

        // Move a última bateria para o índice a ser removido
        baterias[index] = baterias[baterias.length - 1];

        // Remove a última bateria
        baterias.pop();
    }
}