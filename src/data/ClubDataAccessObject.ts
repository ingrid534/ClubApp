import { PrismaClient } from "../generated/prisma/client.js"
export class ClubDataAccessObject {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /**
     * Return the club object associated with the given id.
     * @param clubId the ID of the club to be retrieved.
     */
    async getClubById(clubId: string) {
        // prisma.club.findUnique
    }

    /**
     * Return the organizer (id) of the given club (by id).
     * @param clubId club id 
     */
    async getOrganizer(clubId: string) {
        // prisma.club.findUnique
    }

    /**
     * Return the list of users (by id) that follow the given club.
     * @param clubId club id
     */
    async getClubFollowers(clubId: string) {
        // use prisma.clubFollowing.findMany - search by clubID.
        // i think we shouldn't have separate DAO for clubFollowing since all it's used for are club and user operations, which should be in their respective DAOs.
    }

    /**
     * Return whether this club is registered.
     * @param clubId club (by id) to check registration for 
     */
    async checkClubRegistered(clubId: string) {
        // prisma.club.findUnique (select registered field)
    }

    
}