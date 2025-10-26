// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistroBateriasMoura {
    
    // Estrutura que representa uma bateria defeituosa
    struct Bateria {
        string tipo;        // Tipo da bateria (ex: Premium 80Ah)
        string uso;         // Uso: automotivo, náutico, industrial
        string nr_serie;    // Número de série da bateria
        string dataprod;    // Data de produção (ex: "2025-10-20")
        string lote;        // Lote de fabricação
    }

    // Array dinâmico para armazenar as baterias registradas
    Bateria[] private baterias;

    // Função para adicionar uma nova bateria (setter)
    function adicionarBateria(
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

    // Função para obter uma bateria pelo índice (getter)
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

    // Função para listar todas as baterias armazenadas
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }

    // Função auxiliar: retorna o total de baterias registradas
    function totalBaterias() public view returns (uint) {
        return baterias.length;
    }
}
