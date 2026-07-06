import { describe, it, expect } from 'vitest'
import { getReadableTextColor } from '../color'

describe('getReadableTextColor', () => {
  it('returns light for white background', () => {
    // Arrange
    const hex = 'ffffff'

    // Act
    const result = getReadableTextColor(hex)

    // Assert
    expect(result).toBe('light')
  })

  it('returns dark for black background', () => {
    // Arrange
    const hex = '000000'

    // Act
    const result = getReadableTextColor(hex)

    // Assert
    expect(result).toBe('dark')
  })

  it('returns light for light colors', () => {
    // Arrange
    const lightHexColors = ['f0f0f0', 'ffd700', 'e4e669']

    // Act & Assert
    lightHexColors.forEach((hex) => {
      expect(getReadableTextColor(hex)).toBe('light')
    })
  })

  it('returns dark for dark colors', () => {
    // Arrange
    const darkHexColors = ['0075ca', 'b60205', '1d1d1d']

    // Act & Assert
    darkHexColors.forEach((hex) => {
      expect(getReadableTextColor(hex)).toBe('dark')
    })
  })

  describe('mid-tone boundary', () => {
    it('returns light for color just above the threshold', () => {
      // Arrange
      const hex = '808080' // luminance ≈ 0.502

      // Act
      const result = getReadableTextColor(hex)

      // Assert
      expect(result).toBe('light')
    })

    it('returns dark for color just below the threshold', () => {
      // Arrange
      const hex = '7f7f7f' // luminance ≈ 0.498

      // Act
      const result = getReadableTextColor(hex)

      // Assert
      expect(result).toBe('dark')
    })
  })
})
