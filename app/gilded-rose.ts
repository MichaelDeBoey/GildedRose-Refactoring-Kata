export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  public constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  public updateQuality = () => {
    this.items = this.items.map<Item>((item) => {
      const updatedItem = this.updateItem(item);

      return {
        ...updatedItem,
        quality:
          updatedItem.quality < MIN_QUALITY ? MIN_QUALITY : updatedItem.quality,
      };
    });

    return this.items;
  };

  private updateAgedBrie = ({ name, quality, sellIn }: Item): Item => {
    const newQuality = quality + 1;

    return {
      name,
      quality: newQuality > MAX_QUALITY ? MAX_QUALITY : newQuality,
      sellIn: sellIn - 1,
    };
  };

  private updateBackstagePass = ({ name, quality, sellIn }: Item): Item => {
    const qualityToAdd =
      sellIn > 10 ? 1 : sellIn > 5 ? 2 : sellIn > 0 ? 3 : -quality;
    const newQuality = quality + qualityToAdd;

    return {
      name,
      quality: newQuality > MAX_QUALITY ? MAX_QUALITY : newQuality,
      sellIn: sellIn - 1,
    };
  };

  private updateCommonItem = ({ name, quality, sellIn }: Item): Item => ({
    name,
    quality: quality - (sellIn > 0 ? 1 : 2),
    sellIn: sellIn - 1,
  });

  private updateItem = (item: Item): Item => {
    const updateFunctionByName = {
      'Aged Brie': this.updateAgedBrie,
      'Backstage passes to a TAFKAL80ETC concert': this.updateBackstagePass,
      'Sulfuras, Hand of Ragnaros': this.updateSulfuras,
    };
    const updateFunction =
      updateFunctionByName[item.name] || this.updateCommonItem;

    return updateFunction(item);
  };

  private updateSulfuras = (item: Item): Item => item;
}
