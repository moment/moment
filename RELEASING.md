# Releasing Moment

## Preparing A Release

1. Update the changelog and version with `pnpm release:bump-version x.y.z`.
2. Run `pnpm release` to test the project and update the committed distribution
   files.
3. Review and commit the source, metadata, and generated distribution changes.
4. Ensure the protected source branch is green.
5. Create and push the matching bare version tag, for example `2.31.0`.

Generated files remain committed on the 2.x branch because Bower and other
legacy consumers install directly from Git tags.

## Automated Validation And npm Publication

The release workflow runs for version tags such as `2.31.0`. It:

1. Verifies that the tag is valid SemVer and greater than the release on
   `master`.
2. Verifies that the tag matches `package.json`.
3. Runs lint, runtime tests, and the release build.
4. Verifies that rebuilding does not change the committed distribution files.
5. Builds the npm tarball twice and verifies its SHA-256 reproducibility.
6. Installs and tests the exact tarball, including declarations with TypeScript
   1.8 through 7.
7. Uploads the tarball and checksum as workflow artifacts.
8. Publishes the tested tarball to npm with provenance.
9. Updates the `master` branch to point at the release tag.

Release runs are serialized so each tag is compared with the release that
completed immediately before it.

For a transient failure before npm publication, use GitHub Actions to re-run
the failed jobs or the complete workflow. The re-run retains the original tag
context. If the publish step fails ambiguously, first check whether the version
exists on npm. Do not rerun publication if npm already accepted that immutable
version; investigate and record the completed publication instead.

## Recovering From A Stale Release Tag

If release artifact validation fails for a version tag, npm publication stops
before anything is published. Correct the release commit and replace the tag.
For example, for `2.31.0`:

1. Delete the remote and local tags:

   ```bash
   git push origin --delete 2.31.0
   git tag --delete 2.31.0
   ```

2. Run `pnpm release`, commit the resulting files, and push the corrected
   release commit to its source branch.
3. Recreate and push the tag from the corrected commit:

   ```bash
   git tag 2.31.0
   git push origin 2.31.0
   ```

Alternatively, move the existing tag after committing the correction:

```bash
git tag --force 2.31.0
git push --force origin refs/tags/2.31.0
```

Do not force-update a protected tag. If repository policy prevents deleting or
moving the tag, ask a repository administrator for assistance or release a new
version instead.
