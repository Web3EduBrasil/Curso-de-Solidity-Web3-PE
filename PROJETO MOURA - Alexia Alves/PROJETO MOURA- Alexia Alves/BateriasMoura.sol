// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasMouraDefeituosas {
    
    // Estrutura da bateria
    struct Bateria {
        string tipoUso;      // automotivo, nautico, industrial
        string numeroSerie;
        string dataProducao;
        string lote;
    }

    // Array dinâmico para armazenar as baterias
    Bateria[] private baterias;

    // Função para registrar uma nova bateria defeituosa
    function registrarBateria(
        string memory _tipoUso,
        string memory _numeroSerie,
        string memory _dataProducao,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria({
            tipoUso: _tipoUso,
            numeroSerie: _numeroSerie,
            dataProducao: _dataProducao,
            lote: _lote
        });

        baterias.push(novaBateria);
    }

    // Função para obter os dados de uma bateria pelo índice
    function obterBateria(uint _indice)
        public
        view
        returns (
            string memory tipoUso,
            string memory numeroSerie,
            string memory dataProducao,
            string memory lote
        )
    {
        require(_indice < baterias.length, "Indice invalido");

        Bateria memory b = baterias[_indice];
        return (b.tipoUso, b.numeroSerie, b.dataProducao, b.lote);
    }

    // Função para listar todas as baterias registradas
    function listar()
        public
        view
        returns (Bateria[] memory)
    {
        return baterias;
    }

    // Função para saber quantas baterias estão registradas
    function totalBaterias() public view returns (uint) {
        return baterias.length;
    }
}
