import React, { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStarWarsContext } from '../../context/StarWarsContext';
import { Starship } from '../../api/starshipApi';

const SelectedCharacterDetails: React.FC = () => {
    const { selectedCharacter } = useStarWarsContext();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        return () => {
            setNodes([]);
            setEdges([]);
        };
    }, []);

    useEffect(() => {
        if (!selectedCharacter) {
            return;
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        // Вузол для персонажа
        const characterNode: Node = {
            id: `character-${selectedCharacter.id}`,
            data: { label: selectedCharacter.name },
            position: { x: 250, y: 50 }, // Розміщення персонажа
            style: { borderRadius: '10px', padding: '10px', backgroundColor: '#ffcc00' }
        };
        newNodes.push(characterNode);

        // Додаємо вузли фільмів і кораблів
        selectedCharacter.films.forEach((film, filmIndex) => {
            // Вузол фільму
            const filmNode: Node = {
                id: `film-${film.id}`,
                data: { label: `${film.title} (Episode ${film.episode_id})` },
                position: { x: 200 * (filmIndex + 1), y: 200 }, // Горизонтальне розташування фільмів
                style: { borderRadius: '10px', padding: '10px', backgroundColor: '#87CEFA' }
            };
            newNodes.push(filmNode);

            // Зв'язок персонажа з фільмом
            newEdges.push({
                id: `edge-character-film-${film.id}`,
                source: `character-${selectedCharacter.id}`,
                target: `film-${film.id}`,
                type: 'smoothstep',
                animated: false,
                style: { stroke: '#999' }
            });

            // Горизонтальне розташування кораблів під фільмом
            film.starships.forEach((starship: Starship, shipIndex: number) => {
                const starshipNode: Node = {
                    id: `film-${film.id}-starship-${starship.id}`, // Айді з прив'язкою до фільму
                    data: { label: starship.name },
                    position: { x: 200 * (filmIndex + 1) + shipIndex * 150, y: 400 }, // Розташування кораблів під відповідним фільмом
                    style: { borderRadius: '10px', padding: '10px', backgroundColor: '#F08080' }
                };
                newNodes.push(starshipNode);

                // Зв'язок між фільмом та кораблем
                newEdges.push({
                    id: `edge-film-${film.id}-starship-${starship.id}`,
                    source: `film-${film.id}`,
                    target: `film-${film.id}-starship-${starship.id}`,
                    type: 'smoothstep',
                    animated: false,
                    style: { stroke: '#999' }
                });
            });
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [selectedCharacter]);

    return (
        <div style={{ width: '100vw', height: '50vh' }}>
            {selectedCharacter ? (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    nodeTypes={{}}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            ) : (
                <p>No character selected.</p>
            )}
        </div>
    );
};

export default SelectedCharacterDetails;
