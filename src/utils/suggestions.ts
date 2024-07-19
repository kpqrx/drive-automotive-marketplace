import type { OfferFilteringFormSchemaKey } from '@/schemas'

export const getLabelValuesByStrings = (items?: string[]) =>
  items ? items.map((item) => ({ label: item, value: item })) : []

export const getLabelTitleByKey = (key: OfferFilteringFormSchemaKey) => {
  const keyToLabelMap: Partial<Record<OfferFilteringFormSchemaKey, string>> = {
    brands: 'Marka',
    models: 'Model',
    bodyTypes: 'Rodzaj nadwozia',
    fuelTypes: 'Rodzaj paliwa',
    multimediaFeatures: 'Wyposażenie multimediów',
    safetyFeatures: 'Wyposażenie bezpieczeństwa',
    driverAssistanceFeatures: 'Wyposażenie wspomagania kierowcy',
    performanceFeatures: 'Wyposażenie sportowe',
    otherFeatures: 'Inne wyposażenie',
  }

  const keyToTitleMap: Partial<Record<OfferFilteringFormSchemaKey, string>> = {
    brands: 'Wybierz interesujące Cię marki',
    models: 'Wybierz interesujący Cię model',
    bodyTypes: 'Wybierz interesujący Cię rodzaj nadwozia',
    fuelTypes: 'Wybierz interesujący Cię rodzaj paliwa',
    multimediaFeatures: 'Wybierz wyposażenie multimediów',
    safetyFeatures: 'Wybierz wyposażenie bezpieczeństwa',
    driverAssistanceFeatures: 'Wybierz wyposażenie wspomagania kierowcy',
    performanceFeatures: 'Wybierz wyposażenie sportowe',
    otherFeatures: 'Wybierz wyposażenie niestandardowe',
  }

  return {
    label: keyToLabelMap[key] as string,
    title: keyToTitleMap[key] as string,
  }
}
