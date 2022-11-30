import { Item, GildedRose } from '@/gilded-rose';

type MockItem = Partial<Pick<Item, 'name' | 'quality' | 'sellIn'>>;
const runUpdateQualityForItem = ({
  name = 'foo',
  quality = 10,
  sellIn = 10,
}: MockItem) => {
  const item = new Item(name, sellIn, quality);
  const gildedRose = new GildedRose([item]);

  return gildedRose.updateQuality()[0];
};

describe('GildedRose', () => {
  describe('updateQuality', () => {
    describe('quality', () => {
      it('should decrease by 1', () => {
        const item = runUpdateQualityForItem({ quality: 10 });

        expect(item.quality).toBe(9);
      });

      it('should decrease by 2 when `sellIn` is 0', () => {
        const item = runUpdateQualityForItem({ sellIn: 0, quality: 10 });

        expect(item.quality).toBe(8);
      });

      it('should never be negative', () => {
        const item = runUpdateQualityForItem({ quality: 0 });

        expect(item.quality).toBe(0);
      });

      describe('Aged Brie', () => {
        const name = 'Aged Brie';

        it('should increase by 1', () => {
          const item = runUpdateQualityForItem({ name, quality: 0 });

          expect(item.quality).toBe(1);
        });
      });

      it('should never be more than 50', () => {
        const item = runUpdateQualityForItem({
          name: 'Aged Brie',
          quality: 50,
        });

        expect(item.quality).toBe(50);
      });

      describe('Backstage passes to a TAFKAL80ETC concert', () => {
        const name = 'Backstage passes to a TAFKAL80ETC concert';

        it.each([20, 15, 11])(
          'should increase by 1 if more than 10 days before',
          (sellIn) => {
            const item = runUpdateQualityForItem({ name, quality: 0, sellIn });

            expect(item.quality).toBe(1);
          }
        );

        it.each([10, 8, 6])(
          'should increase by 2 if 10 days or less before',
          (sellIn) => {
            const item = runUpdateQualityForItem({ name, quality: 0, sellIn });

            expect(item.quality).toBe(2);
          }
        );

        it.each([5, 4, 3, 2, 1])(
          'should increase by 3 if 5 days or less before',
          (sellIn) => {
            const item = runUpdateQualityForItem({ name, quality: 0, sellIn });

            expect(item.quality).toBe(3);
          }
        );

        it('should be 0 after the concert', () => {
          const item = runUpdateQualityForItem({
            name,
            quality: 10,
            sellIn: 0,
          });

          expect(item.quality).toBe(0);
        });
      });

      describe('Sulfuras, Hand of Ragnaros', () => {
        const name = 'Sulfuras, Hand of Ragnaros';

        it.each([10, 80])('should stay the same', (quality) => {
          const item = runUpdateQualityForItem({ name, quality });

          expect(item.quality).toBe(quality);
        });
      });
    });

    describe('sellIn', () => {
      it('should decrease by 1', () => {
        const item = runUpdateQualityForItem({ sellIn: 10 });

        expect(item.sellIn).toBe(9);
      });

      describe('Sulfuras, Hand of Ragnaros', () => {
        const name = 'Sulfuras, Hand of Ragnaros';

        it('should stay the same', () => {
          const item = runUpdateQualityForItem({ name, sellIn: 10 });

          expect(item.sellIn).toBe(10);
        });
      });
    });
  });
});
