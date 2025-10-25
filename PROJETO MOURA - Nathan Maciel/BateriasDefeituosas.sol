// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeituosas {
    struct Bateria {
        string tipo;
        string uso;
        string numeroSerie;
        string dataProducao;
        string lote;
        bool ativo; // Para gerenciamento do status (ativo/inativo)
    }

    Bateria[] private baterias;

    // Evento para registrar nova bateria
    event BateriaAdicionada(uint index, string numeroSerie);

    // Evento para atualização de bateria
    event BateriaAtualizada(uint index, string numeroSerie);

    // Evento para exclusão de bateria
    event BateriaRemovida(uint index, string numeroSerie);

    // Adiciona uma nova bateria
    function adicionarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _numeroSerie,
        string memory _dataProducao,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria({
            tipo: _tipo,
            uso: _uso,
            numeroSerie: _numeroSerie,
            dataProducao: _dataProducao,
            lote: _lote,
            ativo: true
        });
        baterias.push(novaBateria);
        emit BateriaAdicionada(baterias.length - 1, _numeroSerie);
    }

    // Getter para recuperar detalhes de uma bateria pelo índice
    function getBateria(uint index) public view returns (
        string memory tipo,
        string memory uso,
        string memory numeroSerie,
        string memory dataProducao,
        string memory lote
    ) {
        require(index < baterias.length, "Indice fora do limite");
        Bateria memory b = baterias[index];
        require(b.ativo, "Bateria_inativa");
        return (b.tipo, b.uso, b.numeroSerie, b.dataProducao, b.lote);
    }

    // Método setter para atualizar uma bateria existente
    function atualizarBateria(
        uint index,
        string memory _tipo,
        string memory _uso,
        string memory _numeroSerie,
        string memory _dataProducao,
        string memory _lote
    ) public {
        require(index < baterias.length, "Indice fora do limite");
        Bateria storage b = baterias[index];
        require(b.ativo, "Bateria_inativa");
        b.tipo = _tipo;
        b.uso = _uso;
        b.numeroSerie = _numeroSerie;
        b.dataProducao = _dataProducao;
        b.lote = _lote;
        emit BateriaAtualizada(index, _numeroSerie);
    }

    // Lista todas as baterias ativas
    function listar() public view returns (Bateria[] memory) {
        uint count = 0;
        for (uint i = 0; i < baterias.length; i++) {
            if (baterias[i].ativo) {
                count++;
            }
        }
        Bateria[] memory listaAtivos = new Bateria[](count);
        uint j = 0;
        for (uint i = 0; i < baterias.length; i++) {
            if (baterias[i].ativo) {
                listaAtivos[j] = baterias[i];
                j++;
            }
        }
        return listaAtivos;
    }

    // Deletar (desativar) uma bateria pelo índice
    function deletarBateria(uint index) public {
        require(index < baterias.length, "Indice fora do limite");
        Bateria storage b = baterias[index];
        require(b.ativo, "Bateria ja inativa");
        b.ativo = false;
        emit BateriaRemovida(index, b.numeroSerie);
    }
}