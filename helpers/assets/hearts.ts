import { entityManager } from '../waking-nightmare_core/entityManager/entityManager';
import { MonoBehaviour } from '../waking-nightmare_core/gameObject/behaviours/monoBehaviour';
import { GameObject } from '../waking-nightmare_core/gameObject/gameObject/gameObject';
import { Card } from './card';
import { CardRank, CardSuit } from './constants/cards';

export class Hearts extends MonoBehaviour {
  cards: Card[] = [];
  currentPlayersTurn = 0;

  constructor() {
    super({});
  }

  onAwake(): void {
    for (const rank of Object.values(CardRank)) {
      if (typeof rank === 'string') continue;
      for (const suit of Object.values(CardSuit)) {
        if (typeof suit === 'string') continue;
        const card = new GameObject({ name: `${rank} of ${suit}` });
        const cardComponent = new Card(rank, suit);
        card.addComponent(cardComponent);
        entityManager.addEntity(card);
        this.cards.push(cardComponent);
      }
    }
  }

  onUpdate(): void {}
}
