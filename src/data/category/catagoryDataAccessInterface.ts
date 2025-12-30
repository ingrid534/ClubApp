import type { Club } from '../../models/ClubModel.js';
import type { Category } from '../../models/CategoryModel.js';

export default interface CategoryDataAccessInterface {
  /**
   * Get all catagories
   */
  getCatagories(): Promise<Category[]>;

  /**
   * Return all clubs associated with a catagory
   * @param catagory The catagory to get clubs for
   */
  getClubsByCatagory(catagory: string): Promise<Club[]>;

  /**
   * Add a catagory to a club
   * @param clubId club id
   * @param catagory catagory to add
   */
  addClubCatagory(clubId: string, catagory: string): Promise<void>;

  /**
   * Remove a catagory from a club
   * @param clubId club id
   * @param catagory category to remove
   */
  deleteClubCatagory(clubId: string, catagory: string): Promise<void>;

  /**
   * Update catagories for a club
   * @param clubId club id
   * @param catagories array of cateogries to set for the club
   */
  updateClubCatagories(clubId: string, categoryIds: string[]): Promise<void>;
}
