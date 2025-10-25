// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Baterias {
    // Estrutura para armazenar os detalhes da bateria
    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataProd;
        string lote;
    }

    // Array dinâmico para armazenar as baterias
    Bateria[] public baterias;

    // Função para registrar uma nova bateria
    function registrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _nr_serie,
        string memory _dataProd,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria(_tipo, _uso, _nr_serie, _dataProd, _lote);
        baterias.push(novaBateria);
    }

    // Funções getter para recuperar detalhes de uma bateria pelo índice
    function getBateria(uint _index) public view returns (
        string memory tipo,
        string memory uso,
        string memory nr_serie,
        string memory dataProd,
        string memory lote
    ) {
        require(_index < baterias.length, "Indice fora de limite");
        Bateria memory b = baterias[_index];
        return (b.tipo, b.uso, b.nr_serie, b.dataProd, b.lote);
    }

    // Funções setter para atualizar os detalhes de uma bateria pelo índice
    function setTipo(uint _index, string memory _tipo) public {
        require(_index < baterias.length, "Indice fora de limite");
        baterias[_index].tipo = _tipo;
    }

    function setUso(uint _index, string memory _uso) public {
        require(_index < baterias.length, "Indice fora de limite");
        baterias[_index].uso = _uso;
    }

    function setNrSerie(uint _index, string memory _nr_serie) public {
        require(_index < baterias.length, "Indice fora de limite");
        baterias[_index].nr_serie = _nr_serie;
    }

    function setDataProd(uint _index, string memory _dataProd) public {
        require(_index < baterias.length, "Indice fora de limite");
        baterias[_index].dataProd = _dataProd;
    }

    function setLote(uint _index, string memory _lote) public {
        require(_index < baterias.length, "Indice fora de limite");
        baterias[_index].lote = _lote;
    }

    // Função listar: retorna todo o array de baterias
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }
}